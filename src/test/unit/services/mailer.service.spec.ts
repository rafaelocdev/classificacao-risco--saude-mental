import mailerService from "../../../services/mailer.service";

describe("Send mail service", () => {
  test("Should be able to send a welcome email", async () => {
    const clientData = {
      name: "Graham Jordan",
      cpf: "808.988.660-72",
      birthday: "Jan 5, 1911",
      gender: "Male",
      email: "cubilia.curae.donec@hotmail.com",
      mobile: "44-34022-4365",
      address: "823-7594 Vestibulum. Av.",
    };

    const response = await mailerService.welcomeEmail(clientData);

    expect(response).toEqual(
      expect.objectContaining({
        message: "Email sent successfully.",
      })
    );
  });
});
