use Data::Dumper;
use JSON qw( );
our $JS = JSON->new;

my $str = File2String('../src/data/Map.json');
my $map = $JS->decode( $str );

# print Data::Dumper->Dump([ $map ], [ 'map' ]);

my $NatFile = join("\t", 'Code', 'Nom', 'NomLong','Couleur' )."\n";
my $RssFile = join("\t", "Nom", "Nation", "Type", "Hexagone", "Qté" )."\n";
my $CtyFile = join("\t", "Nom", "Nation", "Type", "Hexagone", "Fortification", "Description" )."\n";
my $HexFile = join("\t", "Hexagone", "Nation" )."\n";


foreach my $nat (keys %{ $map->{Nations} }) {
	$NatFile .= join("\t", $nat, $map->{Nations}{$nat}{Nom}, $map->{Nations}{$nat}{NomLong}, $map->{Nations}{$nat}{Couleur} )."\n";
	foreach my $city (@{ $map->{Nations}{$nat}{Cities} }) {
		$map->{Cities}{$city}{Nation} = $map->{Nations}{$nat}{Nom};
	}
	foreach my $rss (@{ $map->{Nations}{$nat}{Ressources} }) {
		$map->{Cities}{$city}{Nation} = $map->{Nations}{$nat}{Nom};
		$RssFile .= join("\t", $rss->{Nom}, $map->{Nations}{$nat}{Nom}, $rss->{Type}, $rss->{H}, $rss->{Qte} )."\n";
	}
	foreach my $hex (@{ $map->{Nations}{$nat}{Hexs} }) {
		$HexFile .= join("\t", $hex, $map->{Nations}{$nat}{Nom} )."\n";
	}
}

foreach my $city (keys %{ $map->{Cities} }) {
	$CtyFile .= join("\t", $city, $map->{Cities}{$city}{Nation}, $map->{Cities}{$city}{Type}, $map->{Cities}{$city}{H}, ($map->{Cities}{$city}{Fortification}?$map->{Cities}{$city}{Fortification}:'?'), $map->{Cities}{$city}{Desc} )."\n";
}

# print $NatFile;
String2File("KelkaMap - Nations.tsv",$NatFile);

# print $CtyFile;
String2File("KelkaMap - Cities.tsv",$CtyFile);

# print $RssFile;
String2File("KelkaMap - Ressources.tsv",$RssFile);

# print $HexFile;
String2File("KelkaMap - Hexagones.tsv",$HexFile);

exit(0);

sub File2String ($;@) 	{
	my($name) = shift(@_);
	my(@variables) = @_;
	my($Template) = "";

	open(FIC,"<$name");
	while (<FIC>) {$Template .= $_;}
	close(FIC);
	return sprintf('%s', String2String($Template, @variables));
}

sub String2File ($$$;@) {
	my($name) = shift(@_);
	my($chen) = shift(@_);
	my(@variables) = @_;

	open(FIC,">$name");
	print FIC sprintf('%s', String2String($chen, @variables));
	close(FIC);
}

sub String2String ($$;@) {
	my($string,@variables) = @_;
	my($name,$interpolant);

	while($name=shift(@variables))
	{
		$interpolant = shift(@variables);
		$string =~ s/$name/$interpolant/g;
	}
	return $string;
}