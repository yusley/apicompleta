import prismaClient from "../prisma";

interface DeleteCustomerProps {
  id: string;
}

class DeleteCustomerService {
  async execute({ id }: DeleteCustomerProps) {
    console.log(id);

    if (!id) {
      throw new Error("Paramêtro id não foi passado! ");
    }

    const findUser = await prismaClient.customer.findFirst({
      where: {
        id: id,
      },
    });

    if (!findUser) {
      throw new Error("Cliente não existe");
    }

    await prismaClient.customer.delete({
      where: {
        id: findUser.id,
      },
    });

    return { message: "Usuario deletado!" };
  }
}

export { DeleteCustomerService };
