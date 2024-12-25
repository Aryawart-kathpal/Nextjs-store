import { Select, SelectContent, SelectItem, SelectTrigger,SelectValue } from "../ui/select";

export enum Mode{
    SingleProduct = 'singleProduct',
    cartItem = 'cartItem',
}

type SelectProductAmountProps ={
    mode:Mode.SingleProduct;
    amount:number;
    setAmount : (value:number)=>void
}

type SelectCartItemAmountProps = {
    mode:Mode.cartItem;
    amount:number;
    setAmount : (value:number)=> Promise<void>;
    isLoading:boolean;
}

function SelectProductAmount(props:SelectProductAmountProps | SelectCartItemAmountProps) {

    const {mode,amount,setAmount} = props;
    const cartItem = mode === Mode.cartItem;

  return (
    <>
    {/* amount is integer and select expects string so, typecasting was reqd. also same vice versa case with the setAmount being called on onValueChange */}
        <h4 className="mb-2">Amount : </h4>
        <Select defaultValue={amount.toString()} onValueChange={(value)=>setAmount(Number(value))} disabled={cartItem?props.isLoading:false}>
            <SelectTrigger className={cartItem?'w-[100px]':'w-[150px]'}>
                <SelectValue placeholder={amount}/>
            </SelectTrigger>

            {/*On cart page we will display a +10 items of what are selected on the product page */}

            <SelectContent>a
                {Array.from({length:cartItem?amount+10:10},(_,index)=>{
                    const selectValue = (index+1).toString();
                    return(
                        <SelectItem key={selectValue} value={selectValue}>
                            {selectValue}
                        </SelectItem>
                    )
                })}
            </SelectContent>

        </Select>
    </>
  )
}
export default SelectProductAmount