import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/User.schema';
import { MailService } from '../mail/mail.service'; // You’ll define this

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private model: Model<UserDocument>,
    private readonly mailService: MailService,
  ) {}

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const activationToken = uuidv4();

    const user = new this.model({
      ...dto,
      password: hashedPassword,
      activationToken,
      isActive: false,
    });

    await user.save();

    await this.mailService.sendActivationEmail(user.username, activationToken);

    return { message: 'User created. Activation email sent.' };
  }

  async activateAccount(token: string) {
    const user = await this.model.findOne({ activationToken: token });
    if (!user) throw new Error('Invalid activation token');

    user.isActive = true;
    user.activationToken = undefined;
    await user.save();

    return { message: 'Account activated successfully.' };
  }

  async requestPasswordReset(username: string) {
    const user = await this.model.findOne({ username });
    if (!user) throw new Error('User not found');

    const resetToken = uuidv4();
    user.resetToken = resetToken;
    await user.save();

    await this.mailService.sendResetEmail(username, resetToken);
    return { message: 'Reset email sent.' };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.model.findOne({ resetToken: token });
    if (!user) throw new Error('Invalid reset token');

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    await user.save();

    return { message: 'Password reset successful.' };
  }

  async findAll() {
    return this.model.find().select('-password -activationToken -resetToken');
  }
}
