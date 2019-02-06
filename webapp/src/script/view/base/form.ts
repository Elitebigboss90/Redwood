import { FormTemplate } from "../../lib/component/formTemplate";
import { Text } from "./form/text";
import { Textarea } from "./form/textarea";
import { Images } from "./form/images";
import { Select } from "./form/select";
import { Number } from "./form/number";

export const FormFactory = new FormTemplate({
    text: Text,
    textarea: Textarea,
    number: Number,
    select: Select,
    images: Images,
})