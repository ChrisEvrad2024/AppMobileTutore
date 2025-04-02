export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
      verifyToken: '/auth/verifiertoken'
    },
    places: {
      all: '/centres',
      detail: '/centres/id',
      byCategory: '/centres/category',
      byFilter: '/centres/filters'
    },
    articles: {
      all: '/articles/getarticles',
      detail: '/articles/id',
      create: '/articles/createarticle',
      update: '/articles/updatearticle'
    },
    users: {
      profile: '/users/getuser',
      update: '/users/updateuser'
    }
  }
};