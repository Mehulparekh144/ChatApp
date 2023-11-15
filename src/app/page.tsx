import AuthForm from "@/components/AuthForm";


export default function Home() {

  return (
    <section className="flex justify-center min-h-screen flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:w-full sm:mx-auto sm:max-w-md">
        <h1 className="font-semibold text-3xl tracking-tight text-center">Sign in to your account</h1>
        <AuthForm/>
        </div>
    </section>
  );
}
