import Header from "@/components/layout/Header/Header";
import RegisterInput from "@/components/ui/Input/InputsRegister";
import classes from './Authentication.module.scss'

const Page = () => {



    return (
        <div className={classes.authentication}>
            <Header></Header>
            <form>
                <RegisterInput
                    type='text'
                    name='email'
                    placeholder='email'
                />
                <RegisterInput
                    type='text'
                    name='password'
                    placeholder='password'
                />
                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
};

export default Page;