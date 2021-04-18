This program sorts the entries (lines) of a file (generally a dictionary)
	lexically. The lines have to contain a '\t' character right after the
	word in the dictionary that resides at the beginning of each line.
	
The input file has to be named "output.txt", since the program was made
	to work in conjuction with "concatenate_txt_files" (executed in the
	same folder, right after "concatenate_txt_files" was finished executing).
	
The output(s) will be as follows:

	output_sorted.txt     -  	containing the sorted entries of the dictionary
								(actually a concatenation of multiple dictionaries,
								as resulted after running "concatenate_txt_files"),
								and from the duplicate words, only the first entry
								found in the input file (called "output.txt") will
								be saved in the resulting file, "output_sorted.txt".
							
	output_sorted_*X*.txt - 	the "output_sorted.txt" file, in sections of files
								containing 300,000 lines each, for the cases when
								the "output_sorted.txt" is too big to be opened,
								considering that one might want to edit the result
								in certain manners.
								
								In this case, after the "output_sorted_*X*.txt"
								have been edited, they can be merged into the same
								file using "concatenate_txt_files", by entering
								the names of each file name to concatenate on a new
								line in the "input.txt" file, as in the following
								example:
								
								input.txt:
								
									output_sorted_0.txt
									output_sorted_1.txt
									output_sorted_2.txt
									output_sorted_3.txt