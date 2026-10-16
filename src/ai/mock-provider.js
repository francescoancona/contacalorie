export class MockProvider {
  // Returns null → caller falls back to local parser
  // eslint-disable-next-line no-unused-vars
  async parseFoods(text) {
    return null;
  }
}
