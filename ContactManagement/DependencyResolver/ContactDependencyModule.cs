using ContactManagement.DAL;
using ContactManagement.Repositories;
using Ninject.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ContactManagement.DependencyResolver
{
    public class ContactDependencyModule : NinjectModule
    {
        public override void Load()
        {
            //DA
            Kernel.Bind<IContactContext>().To<ContactContext>();

            //Repository
            Kernel.Bind<IContactRepository>().To<ContactRepository>();
        }
    }
}