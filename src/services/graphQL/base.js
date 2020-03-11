import { apolloClient } from 'configs';

class Base {
  constructor() {
    this.apollo = apolloClient;
  }

  async mutate(mutation, variables) {
    return this.apollo.mutate({ mutation, variables });
  }

  async query(query, variables) {
    return this.apollo.query({ query, variables });
  }
}

export default Base;
