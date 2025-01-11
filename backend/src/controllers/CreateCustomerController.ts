import { FastifyReply, FastifyRequest } from "fastify";
import { CreateCustomerService } from "../services/CreateCustomerService";
import { customerInterface } from "../interfaces/customerInterface";

class CreateCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, email } = <customerInterface>request.body;

    console.log(name, email);

    const createService = new CreateCustomerService();
    const customer = await createService.execute({ name, email });

    reply.send(customer);
  }
}

export { CreateCustomerController };
