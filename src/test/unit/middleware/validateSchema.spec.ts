import { NextFunction, Request, Response } from "express";
import * as yup from "yup";
import validateSchema from "../../../middlewares/validateSchema.middleware";

describe("Validate Schema Middleware | Unit tests", () => {
  const mockReq: Partial<Request> = { body: {} };
  const mockResponse = () => {
    const res: Partial<Response> = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const nextFunc: NextFunction = jest.fn();

  const mockSchema = yup.object().shape({
    name: yup.string().required(),
    age: yup.number().required(),
  });

  it("Error: When sending missing a required property", async () => {
    const res = mockResponse();
    mockReq.body = { name: "Test" };

    const output: any = await validateSchema(mockSchema)(
      mockReq as Request,
      res as Response,
      nextFunc
    );

    expect(output.status).toHaveBeenCalledWith(400);
    expect(output.json).toHaveBeenCalledWith({
      error: ["age is a required field"],
    });
  });

  it("Should add a 'validated property' in the 'req' when the body is correct", async () => {
    const res = mockResponse();
    mockReq.body = { name: "Teste1", age: 18 };

    const output: any = await validateSchema(mockSchema)(
      mockReq as Request,
      res as Response,
      nextFunc
    );

    expect(mockReq).toHaveProperty("validated");
  });
});
