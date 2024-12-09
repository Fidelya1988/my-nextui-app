import type { NextApiRequest, NextApiResponse } from 'next';
import { UserDto } from '../dto/user.dto';
import authService from '../services/auth.service';
import { createRouter} from "next-connect";
import { z} from 'zod';


const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
  role: z.string()
});



type UserResponse  = Omit <UserDto, 'password'>

interface ResponseData{
  message?: string;
  data?: UserResponse;
  error?: Error | string | z.ZodIssue [] 
}
const router = createRouter<NextApiRequest, NextApiResponse<ResponseData>>();
router.post( async (req, res)=>{
        try {
            const result = signUpSchema.safeParse(req.body);
            console.log(31,result, req.body)
            if (!result.success) {
              return res.status(400).json({ error: result.error.errors });
            }
        
       
      const data = await authService.signUp(req.body)
   
      return res.status(200).json({message: 'ok', data})
    } catch (error: unknown) {
      console.error('Error updating script:', error);
      if (!(error instanceof Error)) {
        
        return res.status(500).json({ message: 'Server error' });

      }
      if(error.message === '409') {
        return res.status(409).json({ message: 'User already exist' });


      }
    }

  })

  export default router.handler();


