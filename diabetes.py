import numpy # perdoret per menaxhim te te dhenave numerike
import pandas # perdoret per manipulime me dataset 
from sklearn.preprocessing import StandardScaler # perdoret per normalizimin (standardizimin) e te dhenave
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


