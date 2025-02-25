import {Result, Button} from "antd";

export default function DrawerResult({assetRef}){
    return(
        <Result
            status="success"
            title="Success!"
            subTitle={`Sucessfully added ${assetRef.current.amount} coin by price ${assetRef.current.price}$!`}
            extra={[
                <Button type="primary" key="console">
                    Close
                </Button>,
                <Button key="buy">Add more</Button>,
            ]}
        />
    )
}