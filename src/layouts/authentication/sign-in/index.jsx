import { useEffect, useMemo, useState } from "react";

// react-router-dom components
import { useNavigate } from "react-router-dom";

// Soft UI Dashboard React components
import SoftBox from "../../../components/SoftBox/index";
import SoftTypography from "../../../components/SoftTypography";
import SoftInput from "../../../components/SoftInput";
import SoftButton from "../../../components/SoftButton";

// Authentication layout components
import CoverLayout from "../components/CoverLayout/index";

// Images
import { useCookies } from "react-cookie";

import { useTranslation } from "react-i18next";
import { setDirection ,useSoftUIController } from "../../../context/index";
import { CircularProgress } from "@mui/material";
import Validation from "../../../service/Validation";
import { LoginSchema } from "../../../schema/login";
import { useLoginMutation } from "../../../redux/RtkSlices/authSlice";
import { ParagraphErrorStyle } from "../../../assets/theme/components/ParagraphError";
import {toast} from 'react-hot-toast'

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [controller, dispatch] = useSoftUIController();
  const [cookies, setCookies, removeCookie] = useCookies([
    "token",
    "user",
  ]);
  const {t ,i18n} = useTranslation()
  const navigate = useNavigate()
  useEffect(()=>{
    if(i18n?.language==='ar'){
      setDirection(dispatch, "rtl");
    }else{
      setDirection(dispatch, "ltr");
    }
  },[])

  const [userLogin ,setUserLogin] = useState({
    email:"",
    password:"",
  })
  const [errors ,setErrors] = useState({})
  const [loginMutation ,{data,status ,error, isLoading}] =useLoginMutation()

  console.log(data);
  const handleChange=(event)=>{
    const {name,value}=event.target
    setUserLogin({...userLogin,[name]:value})
    setErrors({...errors,[name]:""})
  }


  const handleLogin =()=>{
      const loginValidationErrors = Validation.validation(LoginSchema, {
          email:userLogin.email,
          password:userLogin.password,
        });
        if (loginValidationErrors) {
          console.log('loginValidationErrors',loginValidationErrors);
          setErrors(loginValidationErrors);
        } else {
          const data = new FormData()
          data.append('email',userLogin?.email)
          data.append('password',userLogin?.password)
          loginMutation({body:data})
        }
  }

    useMemo(()=>{
        if(status==='fulfilled'){
            setCookies("token", data?.token);
            toast.success(t('welcomeMessage') ,
            {
              icon: '👏',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            }
            )
            navigate("/dashboard");

        }if(status==='rejected'){
          toast.error(error?.data?.message?error?.data?.message:t('somthingRong'))
        }
    },[status])

  return (
    <CoverLayout
      title={t('welcomeMessage')}
      description={t('welcomeBackMessage2')}
    >
      <SoftBox component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold" >
              {t('phone')}
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder={t('email')} onChange={handleChange} name='email' error={errors['email']} success={!errors['email'] && userLogin?.email !==''}/>
          {errors['email']&&<ParagraphErrorStyle>{errors['email']}</ParagraphErrorStyle>}
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              {t('password')}
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder={t('password')} onChange={handleChange} name='password' error={errors['password']} success={!errors['password'] && userLogin?.password !==''}/>
          {errors['password']&&<ParagraphErrorStyle>{errors['password']}</ParagraphErrorStyle>}
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton onClick={handleLogin} variant="gradient"  color="info" fullWidth>
            {isLoading ? <CircularProgress size={20} color='inherit'/> :t('login')}
            
          </SoftButton>
        </SoftBox>

      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
