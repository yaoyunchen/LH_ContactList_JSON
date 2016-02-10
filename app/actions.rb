before do
  content_type 'application/json'
end

# Homepage (Root path)
get '/' do
  content_type 'html'
  erb :index
end

get '/contacts' do
  @contacts = Contact.all
  @contacts.to_json
end

get '/contacts/search' do
  @contact = Contact.where("name LIKE ? OR email LIKE ?", '%' + params[:search] + '%', '%' + params[:search] + '%')
  @contact.to_json
end

post '/contacts/new' do
  @contact = Contact.new(
    name: params[:name],
    email: params[:email]
  )

  if @contact.save!
    {:contact => @contact, :status => "success"}.to_json
  else
    {:contact => @contact, :status => "failure"}.to_json
  end
end

put 'contacts/:id' do
  @contact = Contact.find(params[:id])
  @contact.name = params[:name]
  @contact.email = params[:email]
  if @contact.save
    {:contact => @contact, :status => "success"}.to_json
  else
    {:contact => @contact, :status => "failure"}.to_json
  end
end

delete "/contacts/:id" do
  @contact = Contact.find(params[:id])
  if @contact.destroy
    {:contact => @contact, :status => "success"}.to_json
  else
    {:contact => @contact, :status => "failure"}.to_json
  end
end

# Adds:
# GET /contacts
# GET /products/:id
# POST /product/:id -> {contact: {name: "Name", email: "email@email.email"}}
# PUT /products/:id
# DELETE /products/:id
# rest_json Contact

