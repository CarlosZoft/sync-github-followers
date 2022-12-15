export async function* asyncGeneratorPaginate(
  func: Function,
  args: any,
  limit: number = 100,
  page: number = 1
) {
  while (true) {
    try {
      const data = await func(...args, limit, page);
      page++;

      yield data;
      if (data.length < limit) break;
    } catch (error) {
      console.warn(`exception during fetch`, error);
      yield {
        done: true,
        value: "error",
      };
    }
  }
}
