using Application.Abstractions.Notifications;
using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO.Common;
using Application.DTO.Users;
using Application.Helpers;
using Application.Services.Definitions;
using AutoMapper;
using CSharpFunctionalExtensions;
using Domain.Entities.References;
using Microsoft.AspNetCore.Identity;

namespace Application.Services.Implementations
{
    public class AdminService : IAdminService
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;
        private readonly INotification _notificationService;

        public AdminService(IUserRepository repository,
                            IMapper mapper,
                            INotification notificationService)
        {
            _repository = repository;
            _mapper = mapper;
            _notificationService = notificationService;
        }

        public async Task<Result<CreateOperationResponseDTO, ServiceError>> CreateUser(CreateUserDTO dto, CancellationToken cancellationToken)
        {
            var userInBase = await _repository.GetByLogin(dto.Login, cancellationToken);
            if (userInBase != null)
            {
                return Result.Failure<CreateOperationResponseDTO, ServiceError>(new(ErrorsCode.EXISTING_RECORD, "Пользователь с таким логином уже зарегистрирован!"));
            }

            var newUser = _mapper.Map<User>(dto);
            newUser.Id = Guid.NewGuid();


            string password = string.Empty;
            if (dto.Password == null)
            {
                password = PasswordGenerator.GeneratePassword(12, true);
            }
            else
            {
                password = dto.Password;
            }
            
            
            var hashedPassword = new PasswordHasher<User>().HashPassword(newUser, password);
            newUser.PasswordHashed = hashedPassword;

            var id = await _repository.AddNew(newUser, cancellationToken);

            //await _notificationService.Notificate(newUser, $"Ваш пароль: {password}", "Тест");

            return Result.Success<CreateOperationResponseDTO, ServiceError>(new(id)); 
        }

        public async Task<UnitResult<ServiceError>> ChangeUserActivation(ChangeUserActivationDTO dto, CancellationToken cancellationToken)
        {
            var user = await _repository.GetById(dto.UserId, cancellationToken);
            if (user == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.EXISTING_RECORD, "Пользователь не найден!"));
            }

            user.IsActive = dto.IsActive;
            await _repository.Update(user, cancellationToken);

            return UnitResult.Success<ServiceError>();
        }

        public async Task<UnitResult<ServiceError>> DeleteUser(Guid userId, CancellationToken cancellationToken)
        {
            var user = await _repository.GetById(userId, cancellationToken);
            if (user == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.EXISTING_RECORD, "Пользователь не найден!"));
            }

            await _repository.DeleteById(user.Id, cancellationToken);

            return UnitResult.Success<ServiceError>();
        }

        public async Task<UnitResult<ServiceError>> ResetPassword(Guid userId, CancellationToken cancellationToken)
        {
            var user = await _repository.GetById(userId, cancellationToken);
            if (user == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.EXISTING_RECORD, "Пользователь не найден!"));
                //result.AddMessage("Пользователь с таким логином уже зарегистрирован!", "Login");
                //return result;
            }

            string password = PasswordGenerator.GeneratePassword(12, true);

            var hashedPassword = new PasswordHasher<User>().HashPassword(user, password);
            user.PasswordHashed = hashedPassword;

            var id = await _repository.Update(user, cancellationToken);

            //await _notificationService.Notificate(newUser, $"Ваш пароль: {password}", "Тест");

            return UnitResult.Success<ServiceError>();
        }

        public async Task<Result<List<GetUserDTO>, ServiceError>> GetUsers(PaginationDTO dto, CancellationToken cancellationToken)
        {
            var users = await _repository.GetWithPagination(dto.Page, dto.Size, cancellationToken) ?? [];

            var response = _mapper.Map<List<GetUserDTO>>(users);

            return Result.Success<List<GetUserDTO>, ServiceError>(response);
        }

        public async Task<UnitResult<ServiceError>> ChangeEmail(ChangeUserEmailDTO dto, CancellationToken cancellationToken)
        {
            var user = await _repository.GetById(dto.UserId, cancellationToken);
            if (user == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.EXISTING_RECORD, "Пользователь не найден!"));
            }

            user.Email = dto.NewEmail;
            await _repository.Update(user, cancellationToken);

            return UnitResult.Success<ServiceError>();
        }

        public async Task<UnitResult<ServiceError>> UpdateUser(UpdateUserDTO dto, CancellationToken cancellationToken)
        {
            var user = await _repository.GetById(dto.UserId, cancellationToken);
            if (user == null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.EXISTING_RECORD, "Пользователь не найден!"));
            }

            user.Email = dto.Email;
            user.Role = dto.Role;
            user.IsActive = dto.IsActive;
            user.Initials = new() { Name = dto.Name, Surname = dto.Surname, Patronymic = dto.Patronymic};

            await _repository.Update(user, cancellationToken);

            return UnitResult.Success<ServiceError>();
        }
    }
}

