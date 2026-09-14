import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
    email: z.string().email('E-mail em formato inválido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    businessName: z.string().min(2, 'Nome do estabelecimento é obrigatório'),
    businessType: z
      .enum(['BARBERSHOP', 'BEAUTY_SALON', 'AESTHETIC_CLINIC', 'HEALTH_CLINIC', 'OTHER'])
      .default('BEAUTY_SALON')
      .or(
        z.enum(['barbershop', 'beauty_salon', 'aesthetic_clinic', 'health_clinic', 'other']).transform((val) => val.toUpperCase() as any)
      ),
    businessPhone: z.string().min(8, 'Telefone do estabelecimento é obrigatório'),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(1, 'Senha é obrigatória'),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>['body'];
export type LoginInput = z.infer<typeof loginSchema>['body'];
