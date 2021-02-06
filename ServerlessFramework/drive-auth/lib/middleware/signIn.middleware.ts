import SignInDto from "../dto/signIn.dto";

export default () => ({
    before: ({ event, context }, next) => {
        const { body } = event;

        const signInDto: SignInDto = {
            phone_number: body.phone_number,
            password: body.password,
        };

        context.signInDto = signInDto;
        next();
    },
});