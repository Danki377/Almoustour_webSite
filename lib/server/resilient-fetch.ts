import "server-only";
import { lookup as dnsLookup, type LookupAddress, type LookupOptions } from "node:dns";
import { Agent, fetch as undiciFetch } from "undici";

/**
 * fetch for the UploadThing API. Some resolvers take more than 10 s to answer for
 * sea1.ingest.uploadthing.com, which is longer than Node's default connect timeout:
 * the lookup is cached for a few minutes and the connection gets 30 s.
 */
const TTL = 5 * 60 * 1000;
const cache = new Map<string, { addresses: LookupAddress[]; expires: number }>();

type LookupCallback = (err: NodeJS.ErrnoException | null, address: string | LookupAddress[], family?: number) => void;

function cachedLookup(hostname: string, options: LookupOptions, callback: LookupCallback) {
  const reply = (addresses: LookupAddress[]) => {
    if (options.all) callback(null, addresses);
    else callback(null, addresses[0].address, addresses[0].family);
  };
  const hit = cache.get(hostname);
  if (hit && hit.expires > Date.now()) return reply(hit.addresses);
  dnsLookup(hostname, { ...options, all: true }, (err, addresses) => {
    if (err || !addresses.length) return callback(err ?? new Error(`DNS lookup failed for ${hostname}`), "");
    cache.set(hostname, { addresses, expires: Date.now() + TTL });
    reply(addresses);
  });
}

const agent = new Agent({ connect: { timeout: 30_000, lookup: cachedLookup as never } });

export const resilientFetch = ((input: Parameters<typeof undiciFetch>[0], init?: Parameters<typeof undiciFetch>[1]) =>
  undiciFetch(input, { ...init, dispatcher: agent })) as unknown as typeof fetch;
