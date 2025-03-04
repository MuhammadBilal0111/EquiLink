import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const InputRadio = ({option1, option2}) => {

    return (
        <div className="py-1">
            <RadioGroup defaultValue={option1} className='flex text-white'>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value={option1} id={option1} />
                    <Label htmlFor={option1}>{option1}</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value={option2} id={option2} />
                    <Label htmlFor={option2}>{option2}</Label>
                </div>
            </RadioGroup>
        </div>
    )
}

export default InputRadio

