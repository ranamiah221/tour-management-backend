/* eslint-disable no-console */
import { envVars } from "../config/env";
import { IAuthProvider, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
import bcrypt from 'bcryptjs'
export const seedSuperAdmin = async()=>{
    try{
        const isSuperAdminExits = await User.findOne({email: envVars.SUPER_ADMIN_EMAIL})
        if(isSuperAdminExits){
            console.log("super admin already exits");
            return;
        }
       
        const hashedPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASSWORD,Number(envVars.BCRYPT_SALT_ROUND) )
        const authProvider: IAuthProvider={
            provider:"credentials",
            providerId:envVars.SUPER_ADMIN_EMAIL
        }
        const payload: IUser ={
            name:"Super Admin",
            role:Role.SUPER_ADMIN,
            email:envVars.SUPER_ADMIN_EMAIL,
            password:hashedPassword,
            isVerified:true,
            auths:[authProvider]
            
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const superadmin = await User.create(payload)
        
    }catch(error){
        console.log(error);
    }
}