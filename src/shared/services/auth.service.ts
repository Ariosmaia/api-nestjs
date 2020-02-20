import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AccountService } from 'src/modules/backoffice/services/account.service';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly accountService: AccountService,
        private readonly jwtService: JwtService,
    ) { }

    async createToken() {
				const user: JwtPayload = { 
					document: '12345678984',
					email: 'allan@gmail.com',
					image: 'assets/images/user.png',
					roles: ['admin']
				}
				const accessToken = this.jwtService.sign(user);
        return {
					expiresIn: 3600,
					accessToken,
				}
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        //return await this.accountService.findOneByUsername(payload.document);
        return payload;
    }
}