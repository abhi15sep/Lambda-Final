import { ConfirmUserDto } from '../dto/confirmUser.dto';

export default () => ({
    before: ({ event, context }, next) => {
        const confirmUserDto: ConfirmUserDto = {
            userId: event.pathParameters.id,
            confirmationCode: event.body.confirmationCode,
        };

        context.confirmUserDto = confirmUserDto;
        next();
    },
});
