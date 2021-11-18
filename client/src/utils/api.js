import axios from 'axios';

export default async function api({ url, method, config = null, data = null }) {
  try {
    const res = await axios[method](url, data, config);

    return res;
  } catch (err) {
    return err;
  }
}
