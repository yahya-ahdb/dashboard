import  Joi  from "joi-browser";
import {t} from 'i18next'

export const LoginSchema={
    email:Joi.string().required().email().error(() => {
  return {
    message: t('phoneValidation'),
  }}),
  password:Joi.string().required().error(() => {
  return {
    message: t('passwordValidation'),
  }}),
}