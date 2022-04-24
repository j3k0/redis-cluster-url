# redis-cluster-url

> Create a redis cluster client or redis standalone client with a single url string.

## Usage

Install:

`npm install --save redis-cluster-url`

Create a redis client:

```js
import { createRedisClientOrCluster } from 'redis-cluster-url';

const client = createRedisClientOrCluster('redis://localhost:6379');
const cluster = createRedisClientOrCluster('redis-cluster://redis://192.168.0.1:6379/,redis://192.168.0.2:6379/');
```

## Copyright

(c) 2022, Jean-Christophe Hoelt

## License

MIT
