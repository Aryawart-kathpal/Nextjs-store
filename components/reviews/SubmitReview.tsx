'use client'

import { useUser } from "@clerk/nextjs";
import { useState } from "react"
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import FormContainer from "../form/FormContainer";
import { createReviewAction } from "@/utils/actions";
import RatingInput from "./RatingInput";
import TextAreaInput from "../form/TextAreaInput";
import { SubmitButton } from "../form/Buttons";

// since this is a client component we can't use auth() from clerk server, so useUser hook from clerk/nextjs has to be used

function SubmitReview({productId}:{productId:string}) {
  const [isReviewFormVisible,setIsReviewFormVisible] = useState(false);
  const {user} = useUser();

  return (
    <div>
      <Button size='lg' className="capitalize" onClick={()=>setIsReviewFormVisible((prev)=>!prev)}>
        leave review
      </Button>

      {isReviewFormVisible && <Card className="p-8 mt-8">
          <FormContainer action={createReviewAction}>
            <input type='hidden' name='productId' value={productId}/>

            {/* the user.firstName might not be there if the person is using the email to login so we have to setup the optional chaining when setting it's default value */}

            <input type='hidden' name='authorName' value={user?.firstName || 'user'}/>

            <input type="hidden" name="authorImageUrl" value={user?.imageUrl} />
            <RatingInput name='rating'/>
            <TextAreaInput name='comment' labelText="feedback" defaultValue="Outstanding product!!!"/>
            <SubmitButton className="mt-4"/>
          </FormContainer>
        </Card>}

    </div>
  )
}
export default SubmitReview