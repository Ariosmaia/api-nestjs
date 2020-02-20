import { ExtractJwt, Strategy} from 'passport-jwt';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from '../services/auth.service';
import { JwtPayload } from '../jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secrectOrKey: 'bbc66a6062a9a36f8aac391f3cad0b13',
		});
	}

	async validate(payload: JwtPayload){
		const user = await this.authService.validateUser(payload);
		if(!user){
			throw new UnauthorizedException();
		}
		return user;
	}
}