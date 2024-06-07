import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useForm } from "react-hook-form"
import { SignupValidationSchema } from "@/lib/validation"
import { z } from "zod"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSingInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"
import { useNavigate } from "react-router-dom"
import Loader from "@/components/shared/Loader"


const SignupForm = () => {
  const { toast } = useToast();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isPending: isCreatingUser } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSingInAccount();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidationSchema>>({
    resolver: zodResolver(SignupValidationSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidationSchema>) {
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast({
        title: "Sign up failed. Please try again",
      })
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    })

    if (!session) {
      return toast({
        title: "Sign in failed. Please try again",
      })
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      return toast(
        { title: 'Sign up failed. Please try again' }
      )
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-col bg-secondary-500 py-10 px-8 rounded-[60px] drop-shadow-2xl">
        <p className="base-regular md:h3-regular pt-3 text-dark-1 text-left mb-3">Регистрация</p>

        <form onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4 md:max-w-96 text-dark-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="ФИО" className="shad-input"{...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email" className="shad-input"{...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Пароль" className="shad-input"{...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password_repeat"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Повторите пароль" className="shad-input"{...field} />
                </FormControl>
                <FormMessage className="shad-form_message" />
              </FormItem>
            )}
          />
          <div className="flex justify-between px-[5%] mt-2">
            <p className="text-small-regular text-dark-1 text-center mt-2">
              <Link to="/sign-up" className="text-dark-1 underline text-small-semibold ml-1">Войти</Link>
            </p>
            <Button type="submit" className="shad-button_primary px-[15%]">
              {isUserLoading ? (
                <div className="flex-center gap-2">
                  <Loader />Загрузка...
                </div>
              ) : "Зарегистрироваться"}
            </Button>
          </div>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm