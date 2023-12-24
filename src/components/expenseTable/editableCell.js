import { Form, Input } from 'antd'
import React from 'react'

function EditableCell({editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps}) {
    const inputNode = <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                        required: true,
                        message: `Please Input ${title}!`,
                        },
                    ]}
                >
                {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    )
}

export default EditableCell