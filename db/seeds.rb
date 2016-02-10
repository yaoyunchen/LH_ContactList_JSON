def convert_to_yml(yml_file)
   YAML.load_file(File.absolute_path(yml_file))
  end

  contacts_yml = convert_to_yml('db/data/contacts.yml')

  contacts_yml.each_pair do |name, info|
   Contact.create!(
     name: name,
     email: info["email"]
   )
  end