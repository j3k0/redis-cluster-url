import * as redis from 'redis';

/** Convenience method to create a redis client.
 *
 * - For single-node configuration, it accepts a "redis://" formatted URL.
 * - For cluster configuration, it accepts an url in the form: "redis-cluster://<rootNodeURL>,<rootNodeURL>,...[+nodeAddressMap]"
 *   where each root node url is a redis url.
 *   It can be followed with a "+" sign and the node address map in this format: "<address>=<host>:<port>,<address>=<host>:,<port>,..."
 *   See https://github.com/redis/node-redis/blob/master/docs/clustering.md for details.
 */
export function createRedisClientOrCluster(url: string): redis.RedisClientType | redis.RedisClusterType {
  if (url.slice(0, 16) === 'redis-cluster://') {
    const tokens = url.slice(16).split('+');
    const rootNodes = tokens[0].split(',');
    let nodeAddressMap: { [address: string]: { host: string, port: number } } | undefined = undefined;
    if (tokens.length > 1) {
      nodeAddressMap = {};
      tokens[1].split(',').forEach(kv => {
        const [key, hostPort] = kv.split('=');
        if (key && hostPort) {
          const [host, port] = hostPort.split(':');
          if (host && port) {
            nodeAddressMap![key] = {
              host,
              port: parseInt(port)
            };
          }
        }
      });
    }
    return redis.createCluster({
      rootNodes: rootNodes.map(rootNodeURL => ({
        url: rootNodeURL
      })),
      nodeAddressMap
    });
  }
  else {
    return redis.createClient({ url });
  }
}
