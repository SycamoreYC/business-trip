import React, { useState } from 'react';
import styles from './App.module.scss';
import { Form, Input, Button, DatePicker } from 'antd';
import moment from 'moment'
const { RangePicker } = DatePicker;

function App(props) {
  const [result, setResult] = useState({ income: 0, outcome: 0 })
  const { getFieldDecorator, getFieldsValue } = props.form
  const { income, outcome } = result

  const onCalculate = () => {
    const { income, perdiem, hotel, ticket, date } = getFieldsValue()
    const dateRange = ~~moment(date[1] - date[0]).format('D')

    setResult({
      income: ~~income * dateRange,
      outcome: (~~perdiem + ~~hotel + ~~ticket) * dateRange
    })
  }

  return (
    <Form className={styles.app}>
      <h1 className={styles.title}>Business Budget Calculator</h1>
      <div>
        <div className={styles.bugdetForm}>
          <article>
            <h4>Income (per day)</h4>
            <Form.Item>
              {getFieldDecorator('income', {
                rules: [{ required: true, message: 'Please input your Income!' }],
              })(
                <Input placeholder="Income" type="number" />
              )}
            </Form.Item>
          </article>

          <article>
            <h4>Outcome (per day)</h4>
            <div>
              {getFieldDecorator('perdiem', {
                rules: [{ required: true, message: 'Please input your per diem!' }],
              })(
                <Input placeholder="perdiem" type="number" />
              )}
              {getFieldDecorator('hotel', {
                rules: [{ required: true, message: 'Please input your hotel fee per night!' }],
              })(
                <Input placeholder="hotel" type="number" />
              )}
              {getFieldDecorator('ticket', {
                rules: [{ required: true, message: 'Please input your ticket per day!' }],
              })(
                <Input placeholder="ticket" type="number" />
              )}
            </div>
          </article>

          <article>
            <h4>Date</h4>
            {getFieldDecorator('date', {
              rules: [{ required: true, message: 'Please select your start end end date!' }],
            })(
              <RangePicker />
            )}

          </article>

          <article>
            <Button type="primary" onClick={onCalculate}>Calculate</Button>
          </article>
        </div>

        <article>
          <h4>Total result</h4>
          <div>
            <div>Income: {income}</div>
            <div>Outcome: {outcome}</div>
          </div>
        </article>
      </div>
    </Form>
  );
}

const WrappedApp = Form.create({ name: 'budgetForm' })(App);
export default WrappedApp;
