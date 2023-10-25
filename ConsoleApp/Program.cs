using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {
            TestGroupBy();
        }

        static void TestGroupBy()
        {
            var items = new Person[] {
                new Person { Name = "Lauren", Dob = new DateTime(2007, 4, 24), Gender='F' },
                new Person { Name = "Isla", Dob = new DateTime(2010, 6, 11),Gender='F' },
                new Person { Name = "Angie", Dob = new DateTime(1978, 8, 16),Gender='F' },
                new Person { Name = "Anthony", Dob = new DateTime(1974, 6, 27),Gender='M' },
                new Person { Name = "Susan", Dob = new DateTime(1951, 2, 8),Gender='F' },
                new Person { Name = "David", Dob = new DateTime(1949, 4, 1),Gender='M' }
            };

            items.Select(i => i.Name);

            //IEnumerable<IGrouping<char, Person>> byGender = items.GroupBy(p => p.Gender);

            //var item = items.FirstOrDefault()

        }

        class Person
        {

            public string Name { get; set; }

            public DateTime Dob { get; set; }

            public string Address { get; set; }

            public char Gender { get; set; }


            void TestGroupBy()
            {
                var items = new Person[] { };

                foreach(var item in items)
                {

                }
            }
        }
    }
}