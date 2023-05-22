import { Input } from "antd"

import { Form } from "../styles/components/FormSignUp"
import { PrimaryButton } from "ui"

export default function FormSignUp() {
  return(
    <Form>
      <Input type="text" placeholder="Full name"/>
      <Input type="email" placeholder="Email"/>
      <Input type="password" placeholder="Password"/>

      <PrimaryButton color="#8EB5F0">Create account</PrimaryButton>
    </Form>
  )
}