import numpy # perdoret per menaxhim te te dhenave numerike
import pandas # perdoret per manipulime me dataset 
from sklearn.preprocessing import StandardScaler,OneHotEncoder # perdoret per normalizimin (standardizimin) e te dhenave
from sklearn.model_selection import train_test_split # perdoret per ti ndare te dhenat ne training sets dhe testing sets
from sklearn import svm # 
from sklearn.metrics import accuracy_score  # vlereson performancen e modelit

#Mbledhja dhe analizimi i te dhenave

#ngarkimi i dataset - it

diabetes_dataset = pandas.read_csv('diabetes_dataset.csv')

#funksioni .head() i kthen disa rreshta nga dataframe 
print (diabetes_dataset.head())


#numri i rreshtave dhe kolonave

#print(diabetes_dataset.shape)

#--
#print(diabetes_dataset.describe())
#print(diabetes_dataset['Outcome'].value_counts())


numeric_columns = diabetes_dataset.select_dtypes(include=numpy.number) #zgjedhja e kolonave qe permbajne vetem vlera numerike
#print(numeric_columns.groupby(diabetes_dataset['diabetes']).mean())


x = diabetes_dataset.drop(columns='diabetes', axis=1) # axis = 0 per rresht
#variabla x i permban te gjitha kolonat perveq kolones se rezultatit. Keto kolona nevojiten per me e trajnu modelin
y = diabetes_dataset['diabetes']

#print(x)
#print(y)


#-------------------------------------------------------------------------------------------------------

#Standardizimi i te dhenave

scaler=StandardScaler()
non_numerical_columns = ['gender','smoking_history']
nr_columns = [column for column in x.columns if column not in non_numerical_columns]

encoder = OneHotEncoder()
x_non_numerical_encoder = encoder.fit_transform(x[non_numerical_columns]).toarray()

x_nr_columns_standardized = scaler.fit_transform(x[nr_columns])

#kombinimi i te dhenave numerike dhe jo numerike

x_transformed = numpy.hstack((x_nr_columns_standardized,x_non_numerical_encoder))

#konvertimi ne dataframe

encoded_columns = encoder.get_feature_names_out(non_numerical_columns)
all_columns = numpy.concatenate([nr_columns,encoded_columns])
transformed_columns = pandas.DataFrame(x_transformed,columns=all_columns)


#print(transformed_columns.head())

x = transformed_columns

#Ndarja e te dhenave ne training data dhe test data

x_train, x_test,y_train, y_test = train_test_split(x,y,test_size=0.3,stratify=y,random_state=2)
#print(x.shape,x_train.shape,x_test.shape)

#Model training

classifier = svm.SVC(kernel='linear')
classifier.fit(x_train,y_train)

#how many times the model is predicting correcly

#model evaluation

#accuracy score on the training data

x_train_prediction = classifier.predict(x_train)
train_accuracy = accuracy_score(x_train_prediction,y_train)

print("Train accuracy",train_accuracy)

#accuracy score on the test data

x_test_prediction = classifier.predict(x_test)
test_accuracy = accuracy_score(x_test_prediction,y_test)

print("Test accuracy score: ",test_accuracy)

 

