import SignUpDto from "../dto/signUp.dto";

export default () => ({
    before: ({ event, context }, next) => {
        const { body } = event;

        const signUpDto: SignUpDto = {
            given_name: body.given_name,
            family_name: body.family_name,
            phone_number: body.phone_number,
            password: body.password,
        };

        context.signUpDto = signUpDto;
        next();
    },
});