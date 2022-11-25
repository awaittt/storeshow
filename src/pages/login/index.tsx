import { Button, Card, Checkbox, Form, Input, message } from "antd";
import React from "react";
import logo from "../../img/logo.jpg";
import "./index.scss";
import { useStore } from "../../store";
import  {useNavigate} from 'react-router-dom'

function Login() {
  const {loginStore}=useStore()
  const navigate=useNavigate()
  const onFinish = async(values: any) => {
    //获取token
   await loginStore.getToken({
      mobile:values.mobile,
      code:values.code,
    })
    navigate('/',{replace:true})
    message.success(`欢迎哈皮用户【${values.mobile}】来到商展`)
  };
  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          initialValues={{ remember: true }}
          validateTrigger={["onBlur", "onChange"]}
          onFinish={onFinish}
        >
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: "请输入手机号!" },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入正确的手机号码",
                validateTrigger: "onBlur",
              },
            ]}
          >
            <Input size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              { required: true, message: "请输入验证码!" },
              { len: 6, message: "验证码6个字符", validateTrigger: "onBlur" },
            ]}
          >
            <Input size="large" placeholder="请输入验证码" />
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked"             
          rules={[
              { required:true ,message:"请勾选「用户协议」和「隐私条款」" },
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('请先勾选「用户协议」和「隐私条款」')),
              },
]}>
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login;
