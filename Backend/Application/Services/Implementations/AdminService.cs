using Application.Abstractions.Notifications;
using Application.Abstractions.Repositories;
using Application.Common;
using Application.DTO;
using Application.Helpers;
using Application.Services.Definitions;
using AutoMapper;
using CSharpFunctionalExtensions;
using Domain.Entities;
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


        public async Task<UnitResult<ServiceError>> CreateUser(CreateUserDTO userInfo, CancellationToken cancellationToken)
        {
            var userInBase = await _repository.GetByLogin(userInfo.Login, cancellationToken);
            if (userInBase != null)
            {
                return UnitResult.Failure<ServiceError>(new(ErrorsCode.EXISTING_RECORD, "Пользователь с таким логином уже зарегистрирован!"));
                //result.AddMessage("Пользователь с таким логином уже зарегистрирован!", "Login");
                //return result;
            }

            var newUser = _mapper.Map<User>(userInfo);
            newUser.Id = Guid.NewGuid();

            string password = PasswordGenerator.GeneratePassword(12, true);

            var hashedPassword = new PasswordHasher<User>().HashPassword(newUser, password);
            newUser.PasswordHashed = hashedPassword;

            var id = await _repository.AddNew(newUser, cancellationToken);

            //await _notificationService.Notificate(newUser, $"Ваш пароль: {password}", "Тест");

            return UnitResult.Success<ServiceError>(); 
        }

        public async Task<Result> ChangeUserActivation(Guid userId, bool isActive, CancellationToken cancellationToken)
        {
            var user = await _repository.GetById(userId, cancellationToken);
            if (user == null)
            {
                return Result.Failure("Пользователь не найден!");
            }

            user.IsActive = isActive;
            await _repository.Update(user, cancellationToken);

            return Result.Success();
        }

        public async Task<Result> DeleteUser(Guid userId, CancellationToken cancellationToken)
        {
            var user = await _repository.GetById(userId, cancellationToken);
            if (user == null)
            {
                return Result.Failure("Пользователь не найден!");
            }

            await _repository.DeleteById(user.Id, cancellationToken);

            return Result.Success();
        }

        public async Task<Result<string>> ResetPassword(Guid userId, CancellationToken cancellationToken)
        {
            var user = await _repository.GetById(userId, cancellationToken);
            if (user == null)
            {
                return Result.Failure<string>("Пользователь не найден!");
                //result.AddMessage("Пользователь с таким логином уже зарегистрирован!", "Login");
                //return result;
            }

            string password = PasswordGenerator.GeneratePassword(12, true);

            var hashedPassword = new PasswordHasher<User>().HashPassword(user, password);
            user.PasswordHashed = hashedPassword;

            var id = await _repository.Update(user, cancellationToken);

            //await _notificationService.Notificate(newUser, $"Ваш пароль: {password}", "Тест");

            return Result.Success(password);
        }

        public async Task<Result<List<GetUserDTO>>> GetUsers(int page, int size, CancellationToken cancellationToken)
        {
            var users = await _repository.GetWithPagination(page, size, cancellationToken) ?? [];

            var response = _mapper.Map<List<GetUserDTO>>(users);

            return Result.Success(response);
        }

        public async Task<Result> ChangeEmail(Guid userId, string newEmail, CancellationToken cancellationToken)
        {
            var user = await _repository.GetById(userId, cancellationToken);
            if (user == null)
            {
                return Result.Failure<string>("Пользователь не найден!");
            }

            user.Email = newEmail;
            await _repository.Update(user, cancellationToken);

            return Result.Success();
        }
    }
}
