import axios from 'axios';
import Cookies from 'js-cookie';
import numeral from 'numeral';

const patterns = {
  email: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:]|])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:)+)\])/,
  password: /[^\n]+/,
  cpassword: /[^\n]+/,
  firstName: /^[a-zA-z'_.-]{2,}$/,
  fullName: /^[a-zA-z'_.-]{2,}$/,
  lastName: /^[a-zA-z'_.-]{2,}$/,
  phone: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
  role: /[^\n]+/,
  photo: /[^\n]+/,
  payment_level: /^[0-9]$/,
  name: /[^\n]{2,}/,
  description: /[^\n]{2,}/,
  type: /[^\n]{2,}/,
  course: /[^\n]{2,}/,
  category: /[^\n]{2,}/,
  subCategory: /[^\n]{2,}/,
  unit: /[^\n]{2,}/,
  unitPrice: /^[0-9,]+$/,
  amount: /^[0-9,]+$/,
  base_amount: /^[0-9,]+$/,
  startDate: /^((?:19|20)\d\d)[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/,
  endDate: /^((?:19|20)\d\d)[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/,
  foods: /[^\n]+/,
  date: /[^\n]+/,
  staff_id: /[^\n]{2,}/,
  department: /[^\n]{2,}/,
  designation: /[^\n]{2,}/,
  company: /[^\n]{2,}/,
};

export const getMonthFromString = (mon) => {
  return (
    new Date(Date.parse(mon + ` 1, ${new Date().getFullYear()}`)).getMonth() + 1
  );
};
export const validate = (field, Regex) => {
  if (patterns[Regex].test(field)) return true;
  return false;
};

export const validateInput = (event) =>
  validate(event.target.value, event.target.attributes.name.value);

export const randomInt = (length) => Math.floor(Math.random() * (length - 1));

const baseurl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:7878/attendance'
    : 'https://api-canteen.tellerium.io/attendance';

export const axiosInstance = axios.create({
  baseURL: `${baseurl}/api/v1`,
  timeout: 0,
});

const tokens = {};

export const NULL_IMAGE =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSbMtMaRx27Qw_9XY1mmNhZmA9sPy6SiKwzkA&usqp=CAU';

export function parseJwt(token) {
  if (tokens[token]) return tokens[token];

  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  const result = JSON.parse(jsonPayload);
  tokens[token] = result;

  return result;
}

export async function login_user(userObj) {
  let user = userObj;
  const ctoken = Cookies.get('tell-attendance-app');

  try {
    if (userObj && !ctoken) {
      const { user } = userObj.data.data;
      Cookies.set('tell-attendance-app', user.token, { expires: 1 });

      axiosInstance.defaults.headers = {
        Authorization: `Bearer ${user.token}`,
      };
    } else if (ctoken && !userObj) {
      const _user = parseJwt(ctoken);

      user = { ..._user.user, iat: _user.iat };

      axiosInstance.defaults.headers = {
        Authorization: `Bearer ${ctoken}`,
      };

      user = await axiosInstance.get(`/is-logged-in`);
    }
  } catch (err) {
    console.log(err);
    user = null;
  }

  const theuser = user?.data?.data.user;

  const isAdmin = theuser?.role === 'admin';

  return {
    user: theuser,
    isAdmin,
  };
}

export function logOut() {
  Cookies.remove('tell-attendance-app');

  try {
    // axiosInstance.get('logout');
  } catch (err) {}
}

export const stringSearch = (val, string) => {
  return string && string.toLowerCase().search(val.toLowerCase()) !== -1;
};

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

numeral.register('locale', 'na', {
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'K',
    million: 'M',
    billion: 'B',
    trillion: 'T',
  },
  ordinal: function (number) {
    return number === 1 ? 'er' : 'ème';
  },
  currency: {
    symbol: 'N',
  },
});

numeral.locale('na');

function isFloat(n) {
  return Number(n) === n && n % 1 !== 0;
}

export const addsign = (value) => {
  if (Number(value) < 1000000) {
    return isFloat(value)
      ? numeral(value).format('0,00.00')
      : numeral(value).format('0,00.00');
  } else return numeral(value).format('0.00a');
};

export const requests = {
  get: async (url) => {
    try {
      const response = await axiosInstance.get(`${url}`);
      return response.data;
    } catch (e) {
      throw e;
    }
  },

  post: async (url, body, cancel) => {
    try {
      const response = await axiosInstance.post(`${url}`, body, cancel);
      return response.data;
    } catch (e) {
      throw e;
    }
  },
};
