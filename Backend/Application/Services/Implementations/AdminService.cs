using Application.Abstractions.Repositories;
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

        public AdminService(IUserRepository repository,
                            IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }


        public async Task<Result> CreateUser(CreateUserDTO userInfo, CancellationToken cancellationToken)
        {
            //var validation = _validatorFactory.GetValidator<RegisterUserCommand>().Validate(request);
            //var result = new CQResult<Guid>(validation);

            //if (!validation.IsValid)
            //{
            //    return result;
            //}

            var userInBase = await _repository.GetByLogin(userInfo.Login, cancellationToken);
            if (userInBase != null)
            {
                return Result.Failure("Пользователь с таким логином уже зарегистрирован!");
                //result.AddMessage("Пользователь с таким логином уже зарегистрирован!", "Login");
                //return result;
            }

            var newUser = _mapper.Map<User>(userInfo);
            newUser.Id = Guid.NewGuid();


            string password = PasswordGenerator.GeneratePassword(12, true);

            var hashedPassword = new PasswordHasher<User>().HashPassword(newUser, password);
            newUser.PasswordHashed = hashedPassword;

            var id = await _repository.AddNewAsync(newUser);
            //result.SetResultData(id);

            //if (request.TeacherId != Guid.Empty)
            //{
            //    await _teacherRepository.SetUserForTeacherAsync((Guid)request.TeacherId, id);
            //}

            //return result;

            return Result.Success(); 
        }

        public Task DeactivateUser()
        {
            throw new NotImplementedException();
        }

        public Task DeleteUser()
        {
            throw new NotImplementedException();
        }

    }
}
