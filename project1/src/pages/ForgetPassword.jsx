import axios from "axios"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom" // استخدم useNavigate بدلاً من Navigate
import * as yup from "yup"

export default function ForgetPassword() {
  const navigate = useNavigate() // إنشاء navigate function

  async function verify(values) {
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
      console.log(data)

      // استخدم navigate للانتقال للصفحة التالية
      navigate("/resetPassword")
    } catch (err) {
      console.log(err)
    }
  }

  const validationForget = yup.object().shape({
    email: yup.string().email("email must be a valid email").required("Email is required"),
  })

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationForget,
    onSubmit: verify,
  })

  return (
    <div className="mt-25">
      <div className="container mx-auto p-3 bg-gray-100  rounded-xl">
        <h2 className="text-gray-500 text-3xl font-medium">please enter your Email</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex-column mt-4 space-y-3">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="your Email..."
              className="placeholder:text-gray-500 w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-4 focus:outline-green-200"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="text-center mt-8">
            <button
              type="submit"
              className="mt-3 text-white bg-green-500 hover:bg-green-600 hover:transition-all duration-300 font-medium rounded-lg w-4xl px-5 py-2.5 text-center"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? "Sending..." : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
