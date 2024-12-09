import type { NextApiRequest, NextApiResponse } from 'next';
import { UserDto } from '../dto/user.dto';
import authService from '../services/auth.service';
import { createRouter} from "next-connect";
import { z} from 'zod';


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
 
});



type UserResponse  = Omit <UserDto, 'password'> | Error

interface ResponseData{
  message?: string;
  data?: UserResponse;
  error?: Error | string | z.ZodIssue [] 
}
const router = createRouter<NextApiRequest, NextApiResponse<ResponseData>>();
router.post( async (req, res)=>{
        try {
            const result = loginSchema.safeParse(req.body);
            if (!result.success) {
              return res.status(400).json({ error: result.error.errors });
            }
        
       
      const data = await authService.login(req.body)
   
      return res.status(200).json({message: 'ok', data})
    } catch (error: unknown) {
      console.error('Error updating script:', error);
      if(!(error instanceof Error)) {
        return res.status(500).json({ message: 'Server error' });

      }
      if (error.message === '401') {
        return res.status(401).json({message: 'Wrong email or password'})
      }
    
    }

  })

  export default router.handler();


