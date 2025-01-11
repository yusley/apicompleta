import prismaClient from "../prisma";
import { customerInterface } from "../interfaces/customerInterface";

class CreateCustomerService {
  async execute({ name, email }: customerInterface) {
    if (!name || !email) {
      throw new Error("Preencha todos os dados!");
    }

    const customer = await prismaClient.customer.create({
      data: {
        name,
        email,
        status: true,
      },
    });

    return customer;
  }
}

export { CreateCustomerService };
