import { errorHandler, ErrorHandler } from "../../../errors/errors";

describe("Error Handler | Units Tests", () => {
  it("Testing errorHandler", () => {
    try {
      throw new ErrorHandler(404, "test error");
    } catch (err) {
      expect(err).toBeInstanceOf(ErrorHandler);
      expect(err.statusCode).toBe(404);
      expect(err.message).toBe("test error");
      expect(errorHandler).toThrow();
    }
  });
});
