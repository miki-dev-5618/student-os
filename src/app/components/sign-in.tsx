import {signIn} from "@/app/auth"

export function SignIn(){
    return(
        <form
        action={
            async(formData)=>{
                "use server"
                await signIn("resend", formData)
            }
        }>
            
        </form>
    )
}