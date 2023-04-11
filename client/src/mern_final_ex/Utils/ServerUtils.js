import axios from 'axios';

const url = "http://localhost:8000/api/"

axios.interceptors.request.use(req => {
  let token = sessionStorage["token"]
  req.headers={'x-access-token' : token };
  return req;
});

const getAll = (entity) =>
{
  return axios.get(url+entity)
    .catch((error) => {
      console.error(error.response.data.message);
      throw error;
    });
}

const add = (entity,obj) =>
{
  return axios.post(url+entity, obj)
    .catch((error) => {
      console.error(error.response.data.message);
      throw error;
    });
}

const del = (entity,_id) =>
{
  return axios.delete(url+entity+"/"+_id)
    .catch((error) => {
      console.error(error.response.data.message);
      throw error;
    });
}

const update = (entity,obj) =>
{
  return axios.put(url+entity+"/"+obj._id, obj)
    .catch((error) => {
      console.error(error.response.data.message);
      throw error;
    });
}

const login = (user) =>
{
  return axios.post(url+"auth/login", user)
    .catch((error) => {
      console.error(error.response.data.message);
      throw error;
    });
}

export default {getAll,add,del,update,login};
